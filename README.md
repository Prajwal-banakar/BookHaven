Here we created a simple Spring Boot Application for the Book Inventory System, This application provides basic functionalities for understanding the Book Inventory System. Those are adding new book information, searching for book information, deleting book information, getting information about available books, and other features. For this Application, we have used Spring MVC with the Thymeleaf Java library.

Application Functionality:
In this Book Inventory System application, we provide basic functions to understand the Book Inventory System.

Add Book: In this function, we collected book-related information by using the form in the HTML with the help of Thymeleaf. Below we provide what kind of information is collected from the book.

Delete Book: In this function, we can delete unwanted book information by using bookid and below we provide the related logic below with output.

Search Book: In this function, we can search book information by using bookid and below we provide the related logic below with output.

Book Info: This is special function in this application, In this function It will show book details with It's availability.

Request book : users can request for books by book name and author name 

In Book Inventory System, we have created one Controller class with name BookController by using @Controller Spring Annotations. This class is used for define the API end points to hit the API through the Web Browser. Here every API have different request types like GET, POST. It holds all the business logic and provide the output on the web page by using Thymeleaf Framework.
