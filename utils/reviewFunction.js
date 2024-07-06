const {storage,cloudinary}=require("../cloudinary");



module.exports.ReviewAvg=(arr)=>{
    let newArr=[];
   for(let obj of arr){
      newArr.push(obj.rating);
   }
   let sum = 0;
   for (let i = 0; i < newArr.length; i++) {
       sum += parseInt(newArr[i]);
   }
   let value= Math.floor(sum/newArr.length);
    if(Number.isNaN(value)){
        value=0;
    }
   return value;
}


module.exports.Classify=(array)=>{
    const arr = [{name:"5 star", count:0},{name:"4 star", count:0},{name:"3 star", count:0},{name:"2 star", count:0},{name:"1 star", count:0}];

    // Count ratings
    array.forEach(obj => {
        const rating = parseInt(obj.rating);
        if(rating >= 1 && rating <= 5) {
            arr[5 - rating].count++;
        }
    });

    // Calculate percentages
    let totalCount = array.length;
    if(totalCount==0){
        totalCount=1;
    }
    arr.forEach(item => {
        item.percentage = Math.round((item.count / totalCount) * 100);
    });


    return arr;
}


module.exports.deleteImage= async(publicId)=> {
    try {
      const result = await cloudinary.uploader.destroy(publicId);
    //   console.log("Deletion result:", result);
      return result;
    } catch (error) {
      //console.error("Error deleting image:", error);
      throw error;
    }
  }