import express from 'express';

const router = express.Router();
const users = [
    {
        firstname: "John",
        lastname: "Doe",
        sexe: "M",
        age: 30
    },
    {
        firstname: "Marcel Cedric",
        lastname: "Ebelle",
        sexe: "M",
        age: 39
    }
    
]

function register(req, res) {
    const user = req.body;
    users.push(user);
    res.send(`User with the lastname ${user.lastname} added to the database`);

}
router.route('api').post(register);
// Users routes
router.post('/users/register/',(req, res) => {
    const user = req.body;
    users.push(user);
    res.send(`User with the lastname ${user.lastname} added to the database`);

});
router.post('/users/login/',(req, res) => {
    const user = req.body;
    users.push(user);
    res.send(`User with the lastname ${user.lastname} added to the database`);

});
router.get('/users/me/',(req, res) => {
    const user = req.body;
    users.push(user);
    res.send(`User with the lastname ${user.lastname} added to the database`);

});
router.put('/users/me/',(req, res) => {
    const user = req.body;
    users.push(user);
    res.send(`User with the lastname ${user.lastname} added to the database`);

});


export default router;