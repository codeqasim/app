var hash = window.location.hash.substr(1);

    if (hash == "contactadded") {
        vt.success("New account has been added successfully",{
        title:"Account Added",
        position: "bottom-center",
        callback: function (){ //
        } })
    }

    if (hash == "updated") {
        vt.success("Information has been added successfully",{
        title:"Information Updated",
        position: "bottom-center",
        callback: function (){ //
        } })
    }