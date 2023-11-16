const express = require('express');
const router = express.Router();// used to make short your main source file
const auth =  require('../../middleware/auth');
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const request = require('request');
const config = require('config');
const { check, validationResult } = require('express-validator');

//@route         GET api/profile/me
//@description   GET current user
//@access        Private

router.get('/me',auth, async (req, res) =>{
    try{
        const profile = await Profile.findOne({user: req.user.id})
        .populate('user',['name','avatar']);

        if (!profile){
            return res.status(400).json({msg: 'There is no profile for this user'});
        }

        res.json(profile);
    } 
    catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
} );



//@route         Post api/profile/
//@description   Create or Update user profile
//@access        Private

router.post('/',[auth,
[
    check('status', 'Status is required').not().isEmpty(),
    check('skills', 'Skills is required').not().isEmpty()
]
],
async (req, res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }
    
    // destructure the request
    const {
        website,
        skills,
        youtube,
        twitter,
        instagram,
        linkedin,
        facebook,
        status,
        location,
        company,
        bio,
        githubusername,
        // spread the rest of the fields we don't need to check
        ...rest
      } = req.body;

      //Build profile object
      const profileFields = {};
      profileFields.user = req.user.id;
      if (company) profileFields.company = company;
      if (website) profileFields.website = website;
      if (location) profileFields.location = location;
      if (bio) profileFields.bio = bio;
      if (status) profileFields.status = status;
      if (githubusername) profileFields.githubusername = githubusername;
      if (linkedin) profileFields.linkedin = linkedin;
      if (skills) {
        profileFields.skills = skills.split(',').map(skill => skill.trim());
      }

      //Build social object
      profileFields.social = {}
      if (twitter) profileFields.social.twitter = twitter;
      if (facebook) profileFields.social.facebook = facebook;
      if (linkedin) profileFields.social.linkedin = linkedin;
      if (instagram) profileFields.social.instagram = instagram;
      if (youtube) profileFields.social.youtube = youtube;

      try{
        let profile = await Profile.findOne({user: req.user.id});

        if(profile){
            //Update
            profile = await Profile.findOneAndUpdate(
                {user: req.user.id},
                {$set: profileFields},
                {new: true}
            );
            return res.json(profile);
        }
        //Create
        profile = new Profile(profileFields)
        await profile.save();
        res.json(profile);


      } catch(err){
            console.error(err.message);
            res.status(500).send('Server Error');
      }
});


//@route         Get api/profile/
//@description   Get all profiles
//@access        Public
router.get('/', async (req, res) =>
{
    try {
        const profiles = await Profile.find().populate('user',['name', 'avatar'])
        res.json(profiles);
    } catch (error) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }

});

//@route         Get api/profile/user/:user_id
//@description   Get profile by user ID
//@access        Public
router.get('/user/:user_id', async (req, res) =>
{
    try {
        const profile = await Profile.findOne({user:req.params.user_id}).populate('user',['name', 'avatar'])
        
        if(!profile) return res.status(400).json({msg: 'Profile not found'})
        
        res.json(profile);

    } catch (error) {
        console.error(error.message);
        if(error.kind == 'ObjectId')
        {
            return res.status(400).json({
                msg: 'Profile not found'
            })
        }
        res.status(500).send('Server Error');
    }

});


//@route         Get api/profile/
//@description   Delete profile ,user & posts
//@access        Private
router.delete('/',auth, async (req, res) =>
{
    try {
        //remove users post

        //Remove Profile
        await Profile.findOneAndRemove({user: req.user.id});
        //Remove users
        await User.findOneAndRemove({ _id: req.user.id});

        res.json({msg: "User deleted"})

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});



//@route         Put api/profile/experience
//@description   Add profile experience
//@access        Private

router.put('/experience',[ auth,[
    check('title', 'Title is required').not().isEmpty(),
    check('company', 'Company is required').not().isEmpty(),
    check('from', 'Form date is required').not().isEmpty()
]], async (req, res)=>{
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    const {
        title,
        company,
        location,
        from,
        to,
        current,
        description
    } = req.body;

    const newExp = {
        title,
        company,
        location,
        from,
        to,
        current,
        description
    }
    
    try{
        const profile = await Profile.findOne({user: req.user.id});
        profile.experience.unshift(newExp);
        await profile.save();
        res.json(profile);

    } catch (err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

//@route         DELETE api/profile/experience/:edu_id
//@description   DELETE profile experience
//@access        Private

router.delete('/experience/:exp_id', auth, async(req, res)=>{
    try{
        const profile = await Profile.findOne({user: req.user.id});
        const removeIndex = profile.experience.map(item => item.id)
        .indexOf(req.params.exp_id);

        profile.experience.splice(removeIndex, 1);
        await profile.save();
        res.json(profile);
    }catch (err) {

    }
})


//@route         Put api/profile/education
//@description   Add profile education
//@access        Private

router.put('/education',[ auth,[
    check('school', 'School is required').not().isEmpty(),
    check('degree', 'Degree is required').not().isEmpty(),
    check('fieldofstudy', 'Field of study is required').not().isEmpty(),
    check('from', 'Form date is required').not().isEmpty()
]], async (req, res)=>{
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    const {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
    } = req.body;

    const newEdu = {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
    }
    
    try{
        const profile = await Profile.findOne({user: req.user.id});
        profile.education.unshift(newEdu);
        await profile.save();
        res.json(profile);

    } catch (err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

//@route         DELETE api/profile/education/:edu_id
//@description   DELETE profile education
//@access        Private

router.delete('/education/:edu_id', auth, async(req, res)=>{
    try{
        const profile = await Profile.findOne({user: req.user.id});
        const removeIndex = profile.education.map(item => item.id)
        .indexOf(req.params.edu_id);

        profile.education.splice(removeIndex, 1);
        await profile.save();
        res.json(profile);
    }catch (err) {

    }
})


//@route         GET api/profile/github/:username
//@description   Get user repos from Github
//@access        Public

router.get('/github/:username', (req, res) => {
    try{
        const options = {
            uri: `https://api.github.com/users/${req.params.username}`,
            method: 'GET',
            headers: {'user-aent': 'node.js'}
        };
        request(options, (error, response, body)=>{
            if(error) console.error(error);

            if(response.statusCode !== 200){
                res.status(404).json({ msg: "No Github profile found"})
            }
            res.json(JSON.parse(body));
        });
        
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

module.exports = router;