apiKey = "4215659711764c9da91541365297d501";

/*must use exact name*/
function getCharacterIdByName(charName){
   var id = "";
   var req = new XMLHttpRequest();
   req.open("GET", "http://gateway.marvel.com:80/v1/public/characters?name="+charName+"&apikey="+apiKey,false);
   req.addEventListener("load",function(){
	if(req.status >= 200  &&  req.status < 400)
	{
		var response = JSON.parse(req.responseText);
		if(response.data.total !== 0)
		{
			id = response.data.results[0].id;
		}
	}
	else
	   console.log("Error in network request: " + req.statusText);
   });
   req.send();
   return id;
}

function getCharacterImageByName(charName){
   var image = "";
   var req = new XMLHttpRequest();
   req.open("GET", "http://gateway.marvel.com:80/v1/public/characters?name="+charName+"&apikey="+apiKey,false);
   req.addEventListener("load",function(){
        if(req.status >= 200  &&  req.status < 400)
        {
                var response = JSON.parse(req.responseText);
                if(response.data.total !== 0)
                {
			image = "<img src=\"";
                        image += response.data.results[0].thumbnail.path;
			image += "/portrait_incredible.";
			image += response.data.results[0].thumbnail.extension;
			image += "\" alt=\""+charName+"\" style=\"width:216px;height:324px;\">";
                }
        }
        else
           console.log("Error in network request: " + req.statusText);
   });
   req.send();
   return image;
}


function getCharacterNameById(charId){
   var name = "";
   var req = new XMLHttpRequest();
   req.open("GET", "http://gateway.marvel.com:80/v1/public/characters/"+charId+"&apikey="+apiKey,false);
   req.addEventListener("load",function(){
	if(req.status >= 200  &&  req.status < 400)
        {
		var response = JSON.parse(req.responseText);
                if(response.data.total !== 0)
                {
			name = response.data.results[0].name;
                }
	}
        else
		console.log("Error in network request: " + req.statusText);
   });
   req.send();
   return name;
}

// limit is 100
function getSharedComicsByCharIds(charId1,charId2){
   var sharedComicArray = [];
   var req = new XMLHttpRequest();
   req.open("GET", "http://gateway.marvel.com:80/v1/public/comics?limit=100&sharedAppearances="+charId1+"%2C"+charId2+"&apikey="+apiKey,false);
   req.addEventListener("load",function(){
        if(req.status >= 200  &&  req.status < 400)
        {
                var response = JSON.parse(req.responseText);
                if(response.data.total !== 0)
                {
			var totalSharedComics = response.data.count;

			for(var i = 0; i < totalSharedComics; i++)
			{
				sharedComicArray.push({title:response.data.results[i].title,
                                                          id:response.data.results[i].id,
						 description:response.data.results[i].description,
						         url:response.data.results[i].urls[0].url});
			}
                 }
        }
        else
                console.log("Error in network request: " + req.statusText);
   });
   req.send();
   return sharedComicArray;
}
