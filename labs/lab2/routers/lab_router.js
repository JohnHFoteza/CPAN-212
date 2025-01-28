/*
/name
/greeting
/add
/calculate
*/



import express from "express";


const router = express.Router();

//checking if in route
router.get("/", (req, res)=>{
    res.send("Welcome to the lab router")
})

//name route
router.get("/name", (req, res)=>{
    res.send("Busra Sahin")
})

//greetings
router.get("/greeting", (req, res)=>{
    res.send("Hello from John Herrera, student number n01669664")
})

//add
router.get("/add/:x/:y", (req, res)=>{
    let x = parseFloat(req.params.x)
    let y = parseFloat(req.params.y)
    res.send(`${x+y}`)
})

//calculate
router.get("/calculate/:a/:b/:operation", (req, res)=>{
    let a = parseFloat(req.params.a)
    let b = parseFloat(req.params.b)
    let operation = req.params.operation
    let result = 0;

    switch (operation) {
        case "+":
            result = a + b;
            break;

        case "-":
            result = a - b;
            break;

        case "*":
            result = a * b;
            break;
    
        case "/": //-> %2F
            if (b != 0) {
                result = a / b;
            } else {
                console.error("Division by zero is not allowed.");
                result="Division by zero is not allowed."
            }
            break;

        default:
            res.send("Invalid Operator")
            break;
    }
    res.send(`${result}`)
})


export default router;