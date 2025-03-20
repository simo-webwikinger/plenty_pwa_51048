<div align="center">

  <a href="https://plentyone.com" target="_blank">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="./apps/web/public/images/PlentyONE_Logo_White_RGB.svg">
      <source media="(prefers-color-scheme: light)" srcset="./apps/web/public/images/PlentyONE_Logo_PlentyBlue_RGB.svg">
      <img alt="PlentyONE logo" src="./apps/web/public/images/PlentyONE_Logo_PlentyBlue_RGB.svg" height="100px">
    </picture> 
  </a>

### powered by

  <a href="https://alokai.com" target="_blank">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="./apps/web/public/images/alokai-logo-light.svg">
      <source media="(prefers-color-scheme: light)" srcset="./apps/web/public/images/alokai-logo-dark.svg">
      <img alt="alokai logo" src="./apps/web/public/images/alokai-logo-dark.svg" height="40px">
    </picture> 
  </a>

  <h1>Alokai integration with PlentyONE</h1>
</div>



## Technical Task for Front-End Developer Assessment

**Objective:** The goal of this task is to evaluate how well the candidate structures their code, follows best practices, and works with APIs in a Laravel and Vue.js environment. The task involves creating a simple e-commerce front-end component and page, integrating with an existing API.
Our current e-commerce platform is built with **Plentyone** and uses a **Plenty PWA** that leverages :
 **VueJS 3**, **NuxtJS 3**, **TailwindCSS**, and **Storefront UI 2**. 
In this assessment, you will create or recreate pages and components similar to those in our platform while demonstrating clean and maintainable coding practices.

### **Local dev setup**
**Prerequisites**

- Node.js 20+
- Yarn 3
- [Personal Access Token](https://github.com/settings/tokens/new) with the scope read:packages

**Repository Clone**
- git clone https://gitlab.com/Web-Wikinger/plenty_pwa_demo_a.git

**NPM registry**

This project queries data from PlentyONE by using other NPM packages as middleware. These packages are published on the GitHub registry. To download packages from GitHub's registry, you have to authenticate. To enable authentication, carry out the following steps:


1. In the root directory, create a new file called .yarnrc.yml.

1. Copy the contents of `.yarnrc.yml.example` to `.yarnrc.yml`.
then replace`TOKEN` with the Personal Access Token you created earlier.
1. The .gitignore doesn't track .yarnrc.yml, so you don't have to worry about exposing your token.

```properties
# .yarnrc.yml

nodeLinker: node-modules

npmScopes:
  plentymarkets:
    npmAuthToken: 
    npmRegistryServer: 'https://npm.pkg.github.com'

```

### Start the app

1. Open the repository in your command line interface.

1. Run `yarn` to install all dependencies.
1. Run `yarn dev` to start the development server. The app will be served with hot reload at localhost:3000.

## Resources

### Documentation

- [Developers Documentation](https://pwa-docs.plentymarkets.com/)
- [Technical Overview](GUIDE.md)


### **Task Requirements**
You are tasked with developing an e-commerce feature with the following functionality:

**1. Recreate the E-Commerce Header**
Your first task is to recreate the header of an e-commerce platform, similar to the one in our Plenty PWA.
The header serves as the entry point for navigation and user interaction.

**The header must include the following elements:**
1. **Logo**: A placeholder logo or company name.
1. **Search Bar**: A functional search bar where users can type queries.
1. **Navigation Links**: Links to:
	1. Home
	1. Products
	1. Cart
	1. User Profile (if authenticated)
1. **Cart Icon**:
	1. Displays the total number of items in the cart dynamically.
	1. Navigates to the cart page when clicked.
1. **User Authentication**:
	1. A "Login" or "Register" button if the user is not authenticated.
	1. A "Profile" dropdown menu if the user is authenticated, including options like "My Orders" and "Logout."

here is an example of the design we are expecting as a result:

<img src="./taskImages/header.png">
</br></br>

**2. Product List Page (Component-Based Implementation)**

1. Fetch a list of products from a given API endpoint and display them on a product list page.

1. The product list should include:
    - Product title.
    - Product image.
    - Product price.
    - "Add to Cart" button.

**API Exploration:**
- Explore and analyze the API calls being used on the existing product list page.
- Utilize the same endpoints to fetch the necessary data dynamically.
Design Implementation:
- Use the design provided as a reference to structure and style the recreated product list page.
Ensure consistency with the provided layout and responsiveness.


<img src="./taskImages/products.png">
</br></br>

**Technical Details.**
- The layout should be responsive and styled using TailwindCSS.
- Use Storefront UI components where applicable.
- Handle API errors gracefully (e.g., display an error message if data fetching fails).

**3. Product Detail Page (Dynamic Route)**

- When clicking on a product in the product list, navigate to a dynamic product detail page.
- Display detailed information for the selected product:
  - Product title.
  - Product description.
  - Product image(s).
  - Price and availability status.
  - "Add to Cart" button.

**Technical Details:**
- Use NuxtJS dynamic routing to implement this page.
- Ensure that the URL reflects the product's unique identifier (e.g., /product/:id).
- Use reusable Vue.js components for product details and add-to-cart functionality.
- You can reuse the existig components in the product details page. 
<img src="./taskImages/product1.png">
<img src="./taskImages/product2.png">
<img src="./taskImages/product3.png">

**4. Shopping Cart**

- Implement a simple shopping cart that allows users to add products to their cart.
- The cart should display:
  - List of added products.
  - Total price.
  - Product imagE.
  - "Remove from Cart" functionality 

**Technical Details:**
- The cart state should be managed globally (using Vuex or Pinia for state management).
- Ensure cart data persists during navigation within the app (local storage or similar).

<img src="./taskImages/cart.png">

## Optional Task: Newsletter Subscription Form

Create a simple newsletter subscription form that collects the following user information:

- Name.
- Email address.
- Birthday (optional).

The form will be used to subscribe users to a newsletter, and the submitted data should be sent to a mock API endpoint or logged to the console.

**equirements**
- Form Fields:
   - Name (required).
   - Email address (required, validate proper email format).
   - Birthday (optional, date picker).

- Validation:

Ensure the required fields are filled out.
Display appropriate error messages for invalid or incomplete input.

- Submission:

Send the form data to a mock API endpoint or log it to the console for this task.
Provide user feedback on submission (e.g., success or error message).

- Responsive Design:

The form should be styled using TailwindCSS and work well on both desktop and mobile devices.

- Reusability:

Create a reusable form component that can be easily integrated into other pages.
## Deliverables
- Commit Your Changes Daily: Please commit your changes every day with clear and valid commit messages. This helps us understand your progress and the thought process behind your implementation.

- Branching (Optional): If you think it's necessary, feel free to create branches for specific features (e.g., "feature/product-list-page"). Ensure that your branch names are meaningful and align with the task you're working on.

- Daily Review: We will review your commits daily and may ask questions about your implementation choices or approach if necessary.

Final Submission: Once the task is complete, please inform Simo via email.

## Evaluation Criteria
- Code Structure: Clean, maintainable, and modular code.
- Best Practices: Use of modern JavaScript/TypeScript, adherence to Vue and Laravel standards.
- Componentization: Effective use of reusable components.
- API Integration: Proper handling of API requests and error states.
- Styling: Clean and responsive UI using TailwindCSS and Storefront UI.
- Functionality: Fulfillment of the required features.
- Documentation: Clear and well-structured README file.

## Time Limit:
You should aim to complete the task within 10 working days.

All the best


#   p l e n t y _ p w a _ 5 1 0 4 8  
 