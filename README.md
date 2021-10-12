# stripe
Stripe Payment Gateway

# installation steps
create an account on stripe.com and copy the information given below
- test secret key
- test publishable key

open console inside stripe-backend folder and run below command
- npm install

create a file named .env and add key value pair as follows
- STRIPE_SECRET_KEY=[your Stripe secret key]

serve your backend project using below command at http://localhost:8282
- npm start

open console inside stripe-frontend folder and run below command
- npm install

create a file named .env and add key value pair as follows
- REACT_APP_STRIPE_PUBLISHABLE_KEY=[your Stripe publishable key]

serve your frontend project using below command at http://localhost:3000
- npm start

you can validate your payments on http://dashboard.stripe.com/test/events website

# references

Youtube Tutorial: https://www.youtube.com/watch?v=lbEFSP1WAv0