
function loadComponent(url, placeholderId) {
    fetch(url)
        .then(response => response.text())
        .then(data => {
            document.getElementById(placeholderId).innerHTML = data;
        });
}

document.addEventListener("DOMContentLoaded", function() {
    loadComponent("layout.html", "layout-placeholder");
});
