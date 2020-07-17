const Express = require("express");
const router = Express.Router();

const Topics = require("../../models/topics");
const Learnings = require("../../models/learnings");
const LearningDetails = require("../../models/learning-details");

router.post("/:id", async (req, res, next) => {
    const topicType = req.body.topicType;
    const topicName = req.body.topicName;
    const learningName = req.body.learningName;
    const learningDetailName = req.body.learningDetailName;
    const summarySyntax = req.body.summarySyntax || "";
    const summarySemantic = req.body.summarySemantic || "";
    const example = req.body.example || "";

    const topicId = await Topics.getID();
    console.log("TOPIC ID: " + topicId);
    
    await Topics.create({
        id: topicId,
        name: topicName,
        type: topicType
    })
    .then(() => {
        console.log("DONE TOPIC!");
    })
    .catch((err) => {
        console.log("Something went wrong when you create a topic: " + err);
    });

    const userId = req.params.id;
    const learningId = Date.now().toString();
    console.log("LEARNING ID: " + learningId);
    await Learnings.create({
        id: learningId,
        name: learningName, 
        topicId,
        userId
    })
    .then(() => {
        console.log("DONE LEARNING!");
    })
    .catch((err) => {
        console.log("Something went wrong when you create a learning: " + err);
    });

    const STT = await LearningDetails.getSTT(learningId);
    await LearningDetails.create({
        learningId,
        STT,
        name: learningDetailName,
        summarySyntax,
        summarySemantic,
        example
    })
    .then(() => {
        res.status(200).json({
            userMessage: "Successfully added a thing you've learnt!"
        });
    })
    .catch((err) => {
        res.status(404).json({
            userMessage: "System error!!!" 
        });
    });

    next();
});

router.get("/:id", async (req, res, next) => {
    const id = req.params.id;
    const tempTopic = await Topics.findByPk(id);
    const learningList = await Learnings.findAll({
        where: {
            topicId: tempTopic.id
        }
    });
    const data = {
        topic: tempTopic.name,
        subtitle: learningList,
    }
    res.status(200).json({
        data,
        userMessage: "Successfully!!!"
    });
});

router.get("/learning/:id", async (req, res, next) => {
    const id = req.params.id;
    const tempLearning = await Learnings.findByPk(id);

    if(tempLearning){
        res.status(200).json({
            data: {
                learningName: tempLearning.name
            },
            userMessage: "Successfully!!"
        });
    }else{
        res.status(404).json({
            userMessage: "Failed!!"
        });
    }
})

router.get("/detail/:id", async (req, res, next) => {
    const id = req.params.id;
    const tempDetail = await LearningDetails.findAll({
        where: {
            learningId: id
        }
    });

    res.status(200).json({
        data: tempDetail,
        userMessage: "Successfully!!!"
    });
});



module.exports = router;