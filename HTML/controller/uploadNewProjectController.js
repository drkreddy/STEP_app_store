var isEmpty = function(data){
  return !data;
};

var validateFormData = function () {
    var siteLink = $("#siteLink").val();
    var sourceLink = $("#sourceLink").val();
    console.log(siteLink, sourceLink, (isEmpty(siteLink) && isEmpty(sourceLink)));
    if((isEmpty(siteLink) && isEmpty(sourceLink))){
        alert("Please give information, at least about project source code link or project website link");
        return false;
    }
    return true;
};