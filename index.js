#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
import showBanner from "node-banner";
const Conversion = {
    "PKR": {
        "USD": 0.0036,
        "EUR": 0.0034,
        "PKR": 1
    },
    "EUR": {
        "USD": 1.06,
        "PKR": 295.13,
        "EUR": 1
    },
    "USD": {
        "PKR": 279.00,
        "EUR": 0.95,
        "USD": 1
    }
};
async function main() {
    await showBanner('Currency Converter', 'Convert your currency with ease!', 'blue', 'green');
    const answer = await inquirer.prompt([
        {
            type: "list",
            name: "from",
            choices: ["PKR", "USD", "EUR"],
            message: chalk.cyan("Select your currency: ")
        },
        {
            type: "list",
            name: "to",
            choices: ["PKR", "USD", "EUR"],
            message: chalk.cyan("Select your conversion currency: ")
        },
        {
            type: "number",
            name: "amount",
            message: chalk.cyan("Enter your conversion amount: ")
        }
    ]);
    const { from, to, amount } = answer;
    if (from && to && amount) {
        let result = Conversion[from][to] * amount;
        console.log(chalk.green(`Your conversion from ${chalk.magenta(from)} to ${chalk.magenta(to)} is ${chalk.magentaBright(result)}`));
    }
    else {
        console.log(chalk.red("Invalid inputs"));
    }
    const repeatAnswer = await inquirer.prompt([
        {
            type: 'confirm',
            name: 'askAgain',
            message: chalk.cyan('Do you want to convert again?'),
            default: true
        }
    ]);
    if (repeatAnswer.askAgain) {
        main();
    }
    else {
        console.log(chalk.yellow("Thank you for using our currency converter. Have a great day!"));
    }
}
main();
