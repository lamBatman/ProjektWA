
const express = require('express');
const router = express.Router();

const users = [{name: 'Tony', email: 'tony@mail.com'}]
const HomeCnt = require('../src/controller/HomeController');
const RoomCnt = require('../src/controller/RoomController');
const UserCnt = require('../src/controller/UserController');
const MsgCnt = require('../src/controller/MessageController');
/*
router.get('/',HomeCnt.index);
*/
const sqlite3 = require('sqlite3').verbose();
const connection = new sqlite3.Database('./Database/database.sqlite', (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to the SQlite database.');
});

router.get('/',(req,res) => {
    connection.get('SELECT * FROM sqlite_master', (err, row) => {
        if (err) throw err
        console.log(err);
        console.log(row);
        res.json(row);
    });
});


router.get('/rooms/:id', RoomCnt.getById);

router.get('/rooms', RoomCnt.getRooms);

router.post('/rooms', RoomCnt.crtRoom);

router.put('/rooms/:id', RoomCnt.updateRoom);

router.put('/room/:id', RoomCnt.updateRoomOwner);

router.delete('/rooms/:id', RoomCnt.remRoom);

router.post('/register', UserCnt.register);

router.post('/login', UserCnt.login);

router.get('/user/:id', UserCnt.getUserById);

router.get('/users/:login', UserCnt.getUserByLogin);

router.post('/user/:id', UserCnt.updUserById);

router.get('/message/:id', MsgCnt.getMsg);

router.get('/myMessages/:id', MsgCnt.getMyMsg);

router.post('/message', MsgCnt.crtMsg);

router.get('/inroom/:id',MsgCnt.getInRoom);

router.get('/allInroom/:id',MsgCnt.geAllInRoom);

router.get('/inroomAll/:id',MsgCnt.getAllInRoom);

router.post('/inroom/:id', MsgCnt.crtInRoom);

router.put('/inroom/:id', MsgCnt.updInRoom);

router.delete('/inroom/:id', MsgCnt.delInRoom);

router.post('/rooms/:id', RoomCnt.lckRoom);

router.post('/roomkick', RoomCnt.crtRoomKick);

router.get('/roomkick', RoomCnt.getRoomKick);

router.delete('/roomkick', RoomCnt.delRoomKick);


router.options('/:routes',(req, res) => {
    res.send;
});



router.all('/:routes',(req,res) => {
    res.status(404).send("Not found");
});

module.exports = router;
