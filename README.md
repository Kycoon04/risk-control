
# control-de-riesgo-2024

```bash

                        /$$           /$$                                              /$$                         /$$
                       |__/          | $$                                             | $$                        | $$
               /$$$$$$  /$$  /$$$$$$$| $$   /$$         /$$$$$$$  /$$$$$$  /$$$$$$$  /$$$$$$    /$$$$$$   /$$$$$$ | $$
              /$$__  $$| $$ /$$_____/| $$  /$$//$$$$$$ /$$_____/ /$$__  $$| $$__  $$|_  $$_/   /$$__  $$ /$$__  $$| $$
             | $$  \__/| $$|  $$$$$$ | $$$$$$/|______/| $$      | $$  \ $$| $$  \ $$  | $$    | $$  \__/| $$  \ $$| $$
             | $$      | $$ \____  $$| $$_  $$        | $$      | $$  | $$| $$  | $$  | $$ /$$| $$      | $$  | $$| $$
             | $$      | $$ /$$$$$$$/| $$ \  $$       |  $$$$$$$|  $$$$$$/| $$  | $$  |  $$$$/| $$      |  $$$$$$/| $$
             |__/      |__/|_______/ |__/  \__/        \_______/ \______/ |__/  |__/   \___/  |__/       \______/ |__/
                    
```
### Project Description
The project entails the creation of a web platform aimed at facilitating effective management of institutional risk for government institutions. The platform will encompass various features outlined in the provided reference text:

#### The Global System requires:
- Management of Maturity Model #2, which consists of a 5-section form with 4 questions each, offering 5 possible responses.
- Additionally, each module necessitates information maintenance (back office) and corresponding reports (see Annex #1), with the capability to export data to Excel.
- Furthermore, it's essential to keep a record of every user-initiated information modification, along with a tracking report highlighting upcoming audit dates. The system should enable/disable certain functions (enabled for X days annually), and automatically notify the responsible party via email when approaching expiration, system enablement/disabling, and when a new user is assigned a department to be aware of pending tasks.
- A logging system in MongoDB is required to track all user actions, synchronized with the maturity model. Additional communication via WhatsApp for specific notifications, in conjunction with the maturity model, is also necessary.

#### Non-functional Requirements:

- The application should display loading animations while fetching relevant information for the user.
- Information pagination to prevent unnecessary loading for the user and accommodate slow connections.
- Animations during file uploads or asynchronous/heavy processes.
- Responsive web design principles must be applied for accessibility from both computers and phones.
- The application should be developed following MVC and producer-consumer design patterns, along with any other justifiable patterns.
- State management should utilize Zustand and corresponding hooks.
- User account control by roles and logging of user actions throughout the project.
- CSS standardization using tailwindcss and shadcn/ui best practices. Spell-checking with Cspell, code formatting, and validation with eslint and prettier.
- Development of a REST API with Typescript, Next.js, and Azure for authentication, data storage in MySQL via planetscale.com, and file storage in Cloudinary's free tiers.
- Automatic repository publishing through GitHub and Vercel's free tiers.
## Technologies

- [TypeScript](https://www.typescriptlang.org/)
- [Zustand](https://github.com/pmndrs/zustand)
- [Azure AD](https://www.microsoft.com/en-us/security/business/identity-access/microsoft-entra-id)
- [Tailwind CSS](https://tailwindcss.com/)
- [Next.js](https://nextjs.org/)
- [Amazon RDS](https://aws.amazon.com/)
- [MongoDB Atlas](https://www.mongodb.com/atlas/database/)
- [MySQL](https://www.mysql.com/products/workbench/)
- [Vercel](https://vercel.com/)
## Run Locally

Clone this repository:
```bash 
git clone https://github.com/Kycoon04/control-de-riesgo-2024.git
```
Having already cloned the repository, the next step is to install the modules so that it can be executed. 
Write
```bash 
npm install
```
in the console. Once installed, you can execute the code with 
```bash 
npm run dev
```

## Authors

- [@Kycoon](https://github.com/Kycoon04)
- [@SebastianGranadosBarrantes](https://github.com/SebastianGranadosBarrantes)
- [@Anderson](https://github.com/AndersonFer03)
- [@JoustenBlanco](https://github.com/JoustenBlanco)