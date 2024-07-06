let serverData=document.getElementById("serverData");
serverData=JSON.parse(serverData.dataset.data);
let reviewWidths=document.querySelectorAll('.review-width');



let count=0;
for(let el of reviewWidths){
    el.style.width=`${serverData[count].percentage}%`; 
    count++;
}
