import Pet from "../components/Pet"
import '../App.css';
import axios, { AxiosResponse } from "axios";
import React, { useEffect } from "react";

class PetModel {
    pk: string
    ownerName: string
    type: string
    breed: string
    name: string
    dob: string

    constructor(pk: string, ownerName: string, type: string, breed: string, name: string, dob: string){
        this.pk = pk;
        this.ownerName = ownerName;
        this.type = type;
        this.breed = breed;
        this.name = name;
        this.dob = dob;
    }
}

export default function Dashboard() {
    const pets: PetModel[] = []
    const [petItems, _setPetItems] = React.useState(pets);

    document.title = "Pet Advisor | Dashboard"

    let isAuthenticated = false;
    if(sessionStorage.getItem("apiKey")){
      isAuthenticated = true;
    }

    let didInit = false;
    useEffect(()=>{
        if (!didInit) {
            didInit = true;
            getPets();
        }
    }, []);

    async function getBreed(apiUrl: string): Promise<AxiosResponse<any, any>> {
        let data = new FormData();

        return axios({
            url: apiUrl,
            method: "GET",
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem("apiKey"),
            },
            data: data,
        })
            .then((res) => {
                return JSON.stringify(res.data);
            })
            .catch((err) => {
                console.log(err.message);
        });
    }

    async function getOwnerName(apiUrl: string): Promise<AxiosResponse<any, any>> {
        let data = new FormData();
        return axios({
            url: apiUrl,
            method: "GET",
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem("apiKey"),
            },
            data: data,
        })
            .then((res) => {
                return res.data["username"]
            })
            .catch((err) => {
                console.log(err.message);
        });
    }
    
    function getPets(){
        if(isAuthenticated){
            let data = new FormData();
            axios({
                url: "http://localhost:8000/api/pets",
                method: "GET",
                headers: {
                    Authorization: "Bearer " + sessionStorage.getItem("apiKey"),
                },
                data: data,
            })
                .then(async (res) => {
                    for(let i = 0; i < res.data.length; i++){
                        await addPet(res.data[i].pk, res.data[i].owner, res.data[i].breed, res.data[i].name, res.data[i].birth_date);
                    }

                    _setPetItems([...petItems])
                })
                .catch((err) => {
                    console.log(err.message);
            });
        }
    }

    async function addPet(pk: string, ownerUrl: string, breedUrl: string, name: string, dob: string) {
        let owner = (await getOwnerName(ownerUrl).then()).toString();
        let breedJSON = (await getBreed(breedUrl).then()).toString();
        let breed = JSON.parse(breedJSON).name
        let type = JSON.parse(breedJSON).pet_type

        let exists = false;
        petItems.forEach((pet)=>{
            if(pet.pk == pk){
                exists = true;
            }else{
                exists = false;
            }
        })
        
        if(!exists){
            petItems.push(new PetModel(pk, owner, type, breed, name, dob));
        }
    }

    return (
        <>    
            { petItems.map((pet, index) => (
                <Pet key={index} name={pet.name} breed={pet.breed} type={pet.type}/>)
            ) }
        </>
      ) 
}