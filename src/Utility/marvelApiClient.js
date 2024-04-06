var md5 = require('md5');

const PRIVATE_KEY = "4e8a1c8beda6bdcc7fbbb27f9de562dc76f7f8e3";
const PUBLIC_KEY = "a91791907d55d91bfd6edd42eceebcd9";
const totalCharacters = 1564;

const getMarvelResponse = async () => {
  
  const limit = 12;
  let returnArray = [];
  const uniqueNames = new Set();
  
  while (returnArray.length < limit) {
    const results = await fetchCharacters(limit - returnArray.length);
    const updatedArray = results
      .filter((result) => !result.thumbnail.path.includes("image_not_available"))
      .filter((result) => {
        const nameWithoutParentheses = result.name.split('(')[0].trim();
        if (!uniqueNames.has(nameWithoutParentheses)) {
          uniqueNames.add(nameWithoutParentheses);
          return true;
        }
        return false;
      });
    returnArray = [...returnArray, ...updatedArray];
  }

  return returnArray;
}

const fetchCharacters = async (limit) => {
  var ts = new Date().getTime();
  var hash = md5(ts + PRIVATE_KEY + PUBLIC_KEY).toString();
  var url = 'http://gateway.marvel.com:80/v1/public/characters';
  const randomOffset = Math.floor(
    Math.random() * (totalCharacters - limit)
  );
  return await fetch(`${url}?ts=${ts}&apikey=${PUBLIC_KEY}&hash=${hash}&limit=${limit}&offset=${randomOffset}` )
    .then(response => response.json())
    .then(data => {
      console.log(data)
      return data.data.results;
    })
    .catch(err => console.log(err));
}

export default getMarvelResponse;