const nodemailer = require('nodemailer');
const pug = require('pug');
const {htmlToText} = require("html-to-text")

module.exports = class Email {
	constructor(user, eventSlug, eventName, members=null, leader=null, url=null, updatedFields=null) {
		this.to = user.email;
		this.firstName = user.name.split(' ')[0];
		this.url = url;
		this.from = `REBECA <${process.env.EMAIL_FROM}>`
        this.updatedFields = updatedFields
		this.eventSlug = eventSlug
		this.eventName = eventName

		this.members=members
		this.leader=leader

		console.log(updatedFields);
		
	}

	newTransport() {
		return nodemailer.createTransport({
			host: process.env.EMAIL_HOST,
			port: process.env.EMAIL_PORT,
			auth: {
				user: process.env.EMAIL_USERNAME,
				pass: process.env.EMAIL_PASSWORD
			}
			// Activate in gmail "less secure app" option.
			// Gmail is not a good option for production apps.
		});
	}

	async send(template, subject) {
		// 1) Render HTML based on a pug template
		const html = pug.renderFile(`${__dirname}/../views/emails/${template}.pug`, {
			firstName: this.firstName,
			url: this.url,
            updatedFields: this.updatedFields,
			eventName: this.eventName,
			eventSlug: this.eventSlug,

			leader: this.leader,
			members: this.members,
			subject
		});
		const text = htmlToText(html)

		// 2) Define email options
		const mailOptions = {
			from: this.from,
			to: this.to,
			subject,
			html,
			text
			//html: options.html
		}

		// 3) Create a transport and send email
		await this.newTransport().sendMail(mailOptions);
	}

	async sendWelcome() {
		await this.send('welcome', 'Welcome to Rebeca!');
	}
	
	async sendAccountUpdate() {
		await this.send('accountUpdate', 'Account Details Updated');
	}

	async sendRegister(){
		await this.send('register', 'Registration Request submitted');
	}
}