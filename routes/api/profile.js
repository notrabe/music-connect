const express = require('express')
const auth = require('../../middleware/auth')
const router = express.Router()
const { check, validationResult } = require('express-validator/check')

const Profile = require('../../models/Profile')
const User = require('../../models/User')

//@route    GET api/profile/me
//@desc     Get current user's profile
//@access   Private
router.get('/me', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'avatar'])

        if(!profile) {
            return res.status(400).json({ message: 'There is no profile for this user!' })
        }

        res.json(profile)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server error.')
    }
})

//@route    POST api/profile
//@desc     Create or update user profile
//@access   Private
router.post('/', auth, check('instruments', 'instruments is required').notEmpty(), check('activeBands', 'active bands is required'), async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
        const {
            user,
            location,
            instruments,
            bio,
            bandcamp,
            soundcloud,
            youtube,
            facebook,
            twitter,
            instagram
        } = req.body

        // build profile object
        const profileFields = {}
        profileFields.user = req.user.id
        if(location) profileFields.location = location
        if(bio) profileFields.bio = bio
        if(instruments){
            profileFields.instruments = instruments.split(',').map(skill => skill.trim())
        }

        // build social object
        profileFields.social = {}
        if(bandcamp) profileFields.social.bandcamp = bandcamp
        if(soundcloud) profileFields.social.soundcloud = soundcloud
        if(youtube) profileFields.social.youtube = youtube
        if(twitter) profileFields.social.twitter = twitter
        if(facebook) profileFields.social.facebook = facebook
        if(instagram) profileFields.social.instagram = instagram

        try {
            let profile = await Profile.findOne({user: req.user.id})

            if(profile){
                //update
                profile = await Profile.findOneAndUpdate(
                    {user: req.user.id}, 
                    {$set: profileFields}, 
                    {new: true}
                )

                return res.json(profile)
            }

            //create
            profile = new Profile(profileFields)

            await profile.save()
            res.json(profile)
        } catch (err) {
            console.error(err.message)
            res.status(500).send('server error')
        }
    }

)

//@route    GET api/profile
//@desc     Get all profiles
//@access   Public
router.get('/', async (req, res) => {
    try {
        const profiles = await Profile.find().populate('user', ['name', 'avatar'])
        res.json(profiles)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('server error')
    }
})

//@route    GET api/profile/user/:user_id
//@desc     Get profile by id
//@access   Private
router.get('/user/:user_id', async (req, res) => {
    try {
        const profile = await Profile.findOne({user: req.params.user_id}).populate('user', ['name', 'avatar'])

        if(!profile){
            return res.status(400).json({message: 'profile not found'})
        }
        res.json(profile)
    } catch (err) {
        console.error(err.message)
        if(err.kind == 'ObjectId'){
            return res.status(400).json({message: 'profile not found'})
        }
        res.status(500).send('server error')
    }
})

//@route    DELETE api/profile
//@desc     Delete profile, user, & posts
//@access   Private
router.delete('/', auth, async (req, res) => {
    
    try {
        // remove profile
        await Profile.findOneAndRemove({user: req.user.id})
        // remove user
        await User.findOneAndRemove({_id: req.user.id})
        res.json({msg: "User deleted"})
    } catch (err) {
        console.error(err.message)
        res.status(500).send('server error')
    }
})

//@route    PUT api/profile/bands
//@desc     Add band to profile
//@access   Private
router.put('/bands', [auth, [
    check('name', 'name is required').not().isEmpty(),
    check('instruments', 'instruments is required').not().isEmpty(),
]], async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    const{
        name,
        instruments,
        from, 
        to,
        current,
        genre,
        bandcamp,
        soundcloud
    } = req.body

    const newBand = {
        name,
        instruments,
        from, 
        to,
        current,
        genre,
        bandcamp,
        soundcloud
    }

    try {
        const profile = await Profile.findOne({user:req.user.id})

        profile.bands.unshift(newBand)

        await profile.save()

        res.json(profile)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server error')
    }
})

//@route    DELETE api/profile/bands/:band_id
//@desc     Delete band from profile
//@access   Private
router.delete('/bands/:band_id', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({user:req.user.id})

        // Get remove index
        const removeIndex = profile.bands.map(item => item.id).indexOf(req.params.band_id)

        profile.bands.splice(removeIndex, 1)

        await profile.save()

        res.json(profile)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server error')
    }
})

module.exports = router