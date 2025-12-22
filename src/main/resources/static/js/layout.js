
function createNavbar() {
    const navbar = document.createElement('nav');
    navbar.className = 'navbar navbar-expand-sm navbar-light p-3';

    // Get CSRF token and header name from meta tags
    const csrfToken = document.querySelector("meta[name='_csrf']").getAttribute("content");
    const csrfHeader = document.querySelector("meta[name='_csrf_header']").getAttribute("content");

    navbar.innerHTML = `
        <div class="container">
            <a class="navbar-brand" href="#"><i class="fas fa-book"></i> Book Inventory</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavId"
                aria-controls="collapsibleNavId" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="collapsibleNavId">
                <ul class="navbar-nav ms-auto mt-2 mt-lg-0">
                    <li class="nav-item">
                        <a class="nav-link" href="/"><i class="fas fa-home"></i> Home</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/addBook"><i class="fas fa-plus"></i> Add Book</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/search"><i class="fas fa-search"></i> Search</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/deleteBook"><i class="fas fa-trash"></i> Delete</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/info"><i class="fas fa-info"></i> Info</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/contact"><i class="fas fa-envelope"></i> Contact</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#" onclick="event.preventDefault(); document.getElementById('logout-form').submit();">
                            <i class="fas fa-sign-out-alt"></i> Logout
                        </a>
                    </li>
                </ul>
                <form id="logout-form" action="/logout" method="post" style="display: none;">
                    <input type="hidden" name="${csrfHeader}" value="${csrfToken}"/>
                    <input type="hidden" name="_csrf" value="${csrfToken}"/>
                </form>
            </div>
        </div>
    `;
    return navbar;
}

document.addEventListener("DOMContentLoaded", function() {
    const navbarContainer = document.getElementById('navbar-container');
    if (navbarContainer) {
        // Check if CSRF meta tags exist before creating navbar to avoid errors on pages without them (like login/register if they used this script)
        if (document.querySelector("meta[name='_csrf']")) {
            navbarContainer.appendChild(createNavbar());

            // Highlight active link
            const currentPath = window.location.pathname;
            const navLinks = document.querySelectorAll('.nav-link');
            navLinks.forEach(link => {
                if (link.getAttribute('href') === currentPath) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            });
        }
    }
});
