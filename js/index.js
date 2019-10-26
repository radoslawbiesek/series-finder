const baseURL = 'http://www.omdbapi.com/?t=';

const getSeries = async (keyword) => {
    try {
        const response = await fetch(`${baseURL}${keyword}`);
        const data = await response.json()
        return data;
    } catch (error) {
        console.log(error)
    }
}

console.log(getSeries('game'))