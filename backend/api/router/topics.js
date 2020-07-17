const Express = require("express");
const router = Express.Router();

const Topics = require("../../models/topics");
const TopicTypes = require("../../models/topic-types");
const Learnings = require("../../models/learnings");
const LearningDetails = require("../../models/learning-details");

router.get("/", async (req, res, next) => {
    const id = req.params.id;
    const tempTopic = await Topics.findAll();
    const data = {
        topicsList: tempTopic
    }
    res.status(200).json({
        data,
        userMessage: "Successfully!!!"
    });
});

router.post("/", async (req, res, next) => {
    const topicName = req.body.topicName;
    const topicType = req.body.topicType;
    const id = await Topics.getID();

    if(!topicName){
        res.status(404).json({
            userMessage: "Bạn chưa nhập topic name"
        })
    }

    Topics.create({
        id,
        name: topicName,
        type: topicType
    }).then(() => {
        res.status(200).json({
            userMessage: "SUCCESSFULLY"
        })
    }).catch((err) => {
        res.status(404).json({
            userMessage: "FAILED"
        })
    });

});

router.post("/learning", async (req, res, next) => {
    const learningName = req.body.learningName;
    const topicId = req.body.topicId;
    const id = Date.now();

    if(learningName.length <= 3){
        res.status(404).json({
            userMessage: "Learning name trống hoặc quá ngắn"
        });
    }else{
        Learnings.create({
            id,
            name: learningName,
            topicId
        }).then(() => {
            res.status(200).json({
                userMessage: "SUCCESSFULLY"
            })
        }).catch((err) => {
            res.status(404).json({
                userMessage: "FAILED"
            })
        });
    }
});

router.post("/learningDetail", async (req, res, next) => {
    const learningId = req.body.learningId;
    const STT = await LearningDetails.getSTT(learningId);
    const name = req.body.content;
    const summarySyntax = req.body.syntax;
    const summarySemantic = req.body.semantic;
    const example = req.body.example;

    
    LearningDetails.create({
        learningId, 
        STT,
        name,
        summarySyntax,
        summarySemantic,
        example
    }).then(() => {
        res.status(200).json({
            userMessage: "SUCCESSFULLY"
        })
    }).catch((err) => {
        res.status(404).json({
            userMessage: "FAILED, please try it again!!!"
        })
    });

});

router.get("/types", async (req, res, next) => {
    const typesList = await TopicTypes.findAll();

    res.status(200).json({
        data: typesList
    });
});

module.exports = router;