var previewImage = function (input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            var id = input.id + "preview";
            if (!$("#" + id).length) {
                $("#" + input.id).parent().append("<div><img src='#' id='" + id + "'></div>")
            }
            $('#' + id).attr('src', e.target.result)
                .height(100);
        };

        reader.readAsDataURL(input.files[0]);
    }
};