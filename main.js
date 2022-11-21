status1="";
objects=[];
audio="";
function preload(){
    audio=loadSound("wdta.mp3");
}
function setup(){
canvas=createCanvas(350,350);
canvas.center();
video=createCapture(VIDEO);
video.size(350,350);
video.hide();
    objectDetector=ml5.objectDetector("cocossd",modelloaded);
    document.getElementById("status").innerHTML="Status:Detecting Objects";
}
function draw(){
image(video,0,0,350,350);
if(status1!=""){
    r=random(255);
    g=random(255);
    b=random(255);
    objectDetector.detect(video,gotResult);
    for(i=0;i<objects.length;i++){
        document.getElementById("status").innerHTML="status: object detected";
       
        fill(r,g,b);
        percent=floor(objects[i].confidence*100);
        text(objects[i].label+" "+ percent +"%",objects[i].x+20,objects[i].y + 20);
        noFill();
        stroke(r,g,b);
        rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
if(objects[i].label=="person"){
    document.getElementById("baby_not-found").innerHTML="Baby Found ";
    console.log("stop");
    audio.stop();
}
else{
    document.getElementById("baby_not-found").innerHTML="Baby Not Found ";
    console.log("play");
    audio.play(); 
}
    }
if(objects.length==0){
    document.getElementById("baby_not-found").innerHTML="Baby Not Found ";
    console.log("play");
    audio.play();
}
}
}
function modelloaded(){
    console.log("modelloaded");
    status1=true;

}
function gotResult(error,results){
    if(error){
        console.log(error);
    }
    console.log(results);
    objects=results;

}