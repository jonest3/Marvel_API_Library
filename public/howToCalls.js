apiKey = "4215659711764c9da91541365297d501";

function  printComics(){
   document.getElementById("submit").addEventListener("click",function(event){
	var enteredName1 =  document.getElementById("charName").value;
        var enteredName2 =  document.getElementById("charName2").value;

	var charId1 = getCharacterIdByName(enteredName1);
        var charId2 = getCharacterIdByName(enteredName2);

	if(charId1 === ""  &&  charId2 === "")
		document.getElementById("results").textContent = "Error: Character 1 & Character 2 not found.";
	else if(charId1 === "")
		document.getElementById("results").textContent = "Error: Character 1 not found.";
	else if(charId2 === "")
		document.getElementById("results").textContent = "Error: Character 2 not found.";
	else
	{
		var comics = getSharedComicsByCharIds(charId1,charId2);

	        document.getElementById("numResults").textContent = "Number of Results Found:  "+comics.length;
	
	        var listItem = "<dl>";
	
		if(comics.length === 0)
			document.getElementById("results").textContent = "No shared comics found.";
		else
		{
			for(var i = 0; i < comics.length; i++)
			{
				listItem += "<dt><a href=\"" +comics[i].url+"\" target=\"_blank\">"+ comics[i].title + "</a></dt>";
			}
		
			listItem += "</dl>";
		}
		
		document.getElementById("comicList").innerHTML = listItem;
	}
	event.preventDefault();
   });
}

function printPicture(){
   document.getElementById("submit").addEventListener("click",function(event){
	var enteredName1 = document.getElementById("charName").value;
	var enteredName2 = document.getElementById("charName2").value;	
	
	var name1Id = getCharacterIdByName(enteredName1);
	var name2Id = getCharacterIdByName(enteredName2);

	if(enteredName1 !== ""  &&  name1Id !== "")
	{
		var img1 = getCharacterImageByName(enteredName1);
		document.getElementById("lbl1").textContent = enteredName1 + "  ";
		document.getElementById("img1").innerHTML = img1; 
	}
	else if(name1Id !== "")
		document.getElementById("img1").textContent = "No character entered.  ";
	else
		document.getElementById("img1").textContent = "";
	if(enteredName2 !== ""  &&  name2Id !== "")
	{
		var img2 = getCharacterImageByName(enteredName2);
		document.getElementById("lbl2").textContent = "  " + enteredName2;
		document.getElementById("img2").innerHTML = img2;
	}
	else if(name2Id !== "")
		document.getElementById("img2").textContent = "  No character entered.";
	else
		document.getElementById("img2").textContent = "";
	event.preventDefault();
   });
}

function printEnd(){
   document.getElementById("submit").addEventListener("click",function(event){
	document.getElementById("endResults").textContent = "These are just two of many functions that can be written with my Marvel Library!  Marvel's api provides so much data, any programmer can utilize it to write unlimited number of programs/apps.";
   });
}

document.addEventListener("DOMContentLoaded",printEnd);
document.addEventListener("DOMContentLoaded",printComics);
document.addEventListener("DOMContentLoaded",printPicture);
