import axios from "axios";

export const itemsFetch = axios.create({
    baseURL: 'https://rpg-items.p.rapidapi.com',
    headers: {
        'X-RapidAPI-Key': '3dcfafb9demshde1bfbdf4c8c452p101f2ejsnb604b4ed3568',
        'X-RapidAPI-Host': 'rpg-items.p.rapidapi.com'
    }
});