import assert from 'assert/strict'
import supertest from 'supertest'

import mongoose from 'mongoose'

import { MONGODB_CNX_STR } from '../config/mongodb.config.js'


const baseUrl = 'http://localhost:8080'

const requester = supertest(baseUrl)

const mockUser = {
    "firstName":"Cosme",
    "lastName": "Fulanito",
    "age": "37",
    "password": "12345",
    "email": "cosme@mail.com",
    "role": "premium"
}

let jwt

describe('Pruebas funcionales', () => {

    describe('Usuarios', ()=> {
    
        // describe('Creación de usuario', ()=>{
        //     it('Obtención de JWT', async ()=>{
        //         const {body} = await requester.post('/api/users/register').send(mockUser)
        //         jwt = body.payload
        //         assert.ok(jwt.includes('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9'))
        //     })
        // })
        
        describe('Logueo de usuario', ()=>{
            it('Obtención de JWT', async ()=>{
                const {body} = await requester
                .post('/api/sessions/login')
                .send(mockUser)
                jwt = body.payload
                console.log(jwt.includes('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9'))
                assert.ok(jwt.includes('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9'))
            })
        })
      
        describe('Obtención de perfil de usuario', ()=>{
            it('Datos de usuario registrado', async ()=>{
                console.log(jwt)
                const {body} = await requester
                .get('/api/users/profile')
                .set('Authorization', `Bearer ${jwt}`)
                assert.ok(body?.payload?._id)
            })
        })
    })
})