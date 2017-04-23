var publicApiKey = "4215659711764c9da91541365297d501";

function list20Characters(){ 
  	var req = new XMLHttpRequest();
        req.open("GET", "https://gateway.marvel.com:443/v1/public/characters?apikey="+publicApiKey);
//	req.open("GET", "https://gateway.marvel.com:443/v1/public/characters?apikey="+privateApiKey);
	req.addEventListener("load",function(){
	   if(req.status >= 200  &&  req.status < 400)
	   {
		var response = JSON.parse(req.responseText);
		
		var listString = '<ol>';
		response.data.results.forEach(function(character){
			listString += '<li>'+character.name+'</li>';
		});
		listString += '</ol>';
                document.getElementById("characterList").innerHTML = listString;
	   }
	});
	req.send();
}

function getCharIdByName(charName){
        var req = new XMLHttpRequest();
        req.open("GET", "https://gateway.marvel.com:443/v1/public/characters?"+charName+"&orderBy=name&limit=1&apikey="+publicApiKey);
        req.addEventListener("load",function(){
           if(req.status >= 200  &&  req.status < 400)
           {
                var response = JSON.parse(req.responseText);
                var nameAndId = '<p>'+response.data.results.name+': '+response.data.results.id+'</p>';
                document.getElementById("charName").innerHTML = nameAndId;
           }
        });
        req.send();
	return charId;
}

var comicArray = [];

function requestMoreComics(charId,offset){
   req = new XMLHttpRequest();
   req.open("GET", "https://gateway.marvel.com:443/v1/public/characters/"+charId+"/comics?offset="+offset+"&limit=100&apikey="+publicApiKey);

   req.addEventListener("load",function(){
      if(req.status >= 200  &&  req.status < 400)
      {    
           response = JSON.parse(req.responseText);
	
   	   var comicCount = response.data.count;	

           if(comicCount === 100)
           {
    	      requestMoreComics(charId,(offset+100));
           }

	   if(comicArray.length === 0)
	   {
	      comicArray = response.data.results;
           }
	   else
           {
	      comicArray.push.apply(comicArray,response.data.results);
           }
        };
      }
   );
   req.send();
}

function getAllComicsById(charId){
   var offset = 0;

   requestMoreComics(charId,offset);

   return comicArray;
}

function sharedAppearances(char1Id,char2Id){
   req = new XMLHttpRequest();
   req.open("GET", "https://gateway.marvel.com:443/v1/public/characters/"+char1Id+"/comics?sharedAppearances="+char2Id+"&limit=100&apikey="+publicApiKey);
 
   req.addEventListener("load",function(){
      if(req.status >= 200  &&  req.status < 400)
      {

      }
   );
   req.send();

}
