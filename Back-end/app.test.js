const request = require("supertest");
const index = require("./index");

// describe('organisme', () =>{
//     let body = {
//             name: "",
//             ville: "",
//             address: "",
//             phone: ""
//     }

//     describe('http://localhost:4000/organisme/add-organisme', () => {
//         test('You can\'t add this number 0613131313', async() => {
//             body = {
//                 name: "youcode",
//                 ville: "casablanca",
//                 address: "sbata",
//                 phone: "0613131313"
//             }
//             const response = await request(index).post('/organisme/add-organisme').send(body)
//                 expect(response.text).toBe("You can't add this number 0613131313")
//         })
//     })  
//     describe('fill all fields', () => {
//         test('fill all fields', async() => {
//             body = {
//                 name: "",
//                 ville: "casablanca",
//                 address: "sbata",
//                 phone: "0613131313"
//             }
//             const response = await request(index).post('/organisme/add-organisme').send(body)
//                 expect(response.text).toBe("fill all fields")
//         })
//     })
    // describe('organisme is created', () => {
    //     test('organisme is created', async() => {
    //         body = {
    //             name: "Google",
    //             ville: "casablanca",
    //             address: "sbata",
    //             phone: "03090909"
    //         }
    //         const response = await request(index).post('/organisme/add-organisme').send(body)
    //             expect(response.text).toBe("organisme is created")
    //     })
    // })
// })
// describe('http://localhost:4000/organisme/update-organisme', () =>{
//     let body = {
//             name: "",
//             ville: "",
//             address: "",
//             phone: ""
//     }
    // describe('Organisme updated', () => {
    //     test('Organisme updated', async() => {
    //         body = {
    //             name: "soft",
    //             ville: "casa",
    //             address: "noiu",
    //             phone: "8711"
    //         }
    //         const response = await request(index).put('/organisme/update-organisme/63c54ba904bbebceaab5c8e9').send(body)
    //             expect(response.text).toBe("{\"message\":\"Organisme updated\"}")
    //     })
    // })
    // describe('/organisme/update-organisme', () => {
    //     test('fill all fields', async() => {
    //         body = {
    //             name: "",
    //             ville: "casablanca",
    //             address: "sbata",
    //             phone: "0613131313"
    //         }
    //         const response = await request(index).put('/organisme/update-organisme/63c54ba904bbebceaab5c8e9').send(body)
    //             expect(response.text).toBe("fill all fields")
    //     })
    // })
    // describe('This organisme is not found', () => {
    //     test('This organisme is not found', async() => {
    //         body = {
    //             name: "youssofia",
    //             ville: "casablanca",
    //             address: "sbata",
    //             phone: "0613131313"
    //         }
    //         const response = await request(index).put('/organisme/update-organisme/63c54ba904bbebceaab5c8e').send(body)
    //             expect(response.text).toBe("This organisme is not found")
    //     })
    // })
// })