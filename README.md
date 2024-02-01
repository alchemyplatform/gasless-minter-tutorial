# gasless-minter-tutorial

This project is a web application built with React and TypeScript, using Userbase for user authentication.

## Built With

- [React](https://reactjs.org/) - The web framework used
- [TypeScript](https://www.typescriptlang.org/) - The language used
- [Userbase](https://userbase.com/) - User authentication

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js and npm: You can download both from [the official Node.js website](https://nodejs.org/).
- Userbase: You'll need to set up a Userbase account and application, which you can do on [the Userbase website](https://userbase.com/).

### Installing

1. Clone the repository

2. Navigate into the project directory

3. Install the dependencies

```bash
npm install
```

4. Create a `.env` file in the root of your project and add your Userbase app ID

```env
# The ID of your Connect Kit project
CONNECT_KIT_PROJECT_ID=your-connect-kit-project-id

# The ID of your Sepolia Paymaster policy
SEPOLIA_PAYMASTER_POLICY_ID=your-sepolia-paymaster-policy-id

# The public ID of your Userbase application
NEXT_PUBLIC_USERBASE_APP_ID=your-userbase-app-id

# The access token for your Userbase application
USERBASE_ACCESS_TOKEN=your-userbase-access-token
```

### Running the Application

To start the development server, run

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```
> **Note:** The application will be available at `http://localhost:3000`.

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details


This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).
