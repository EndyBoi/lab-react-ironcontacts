import React from 'react'
import contacts from './contacts.json'
import './App.css'

class App extends React.Component {
	// Start with 5 random people, though if it pulls at the end of the array you will get less than 5 results
	state = {
		contactList: contacts.splice(
			Math.floor(Math.random() * contacts.length),
			5
		),
		contacts: [...contacts],
	}

	// Unused top 5 function
	// topFive = () => {
	// 	for (let i = 0; i < 5; i++) {
	// 		this.state.contacts.splice(i, 1)
	// 	}
	// }

	// Get and add one random person to the list
	randomContact = () => {
		let randomIndex = Math.floor(Math.random() * this.state.contacts.length)
		let tempContacts = [...this.state.contacts]
		let tempContact = tempContacts.splice(randomIndex, 1)
		let tempContactList = [...this.state.contactList]
		tempContactList.push(tempContact[0])
		this.setState({
			contacts: tempContacts,
			contactList: tempContactList,
		})
	}

	//Sort list by the first letter. Probably a better way to do this
	sortName = () => {
		let tempContactList = [...this.state.contactList]
		tempContactList.sort((x, y) => {
			if (x.name > y.name) {
				return 1
			} else if (x.name < y.name) {
				return -1
			} else return 0
		})
		this.setState({
			contactList: tempContactList,
		})
	}

	//Sort by popularity from highlight to lowest you could reverse this on a toggle...
	sortPopularity = () => {
		let tempContactList = [...this.state.contactList]
		tempContactList.sort((x, y) => {
			if (x.popularity > y.popularity) {
				return -1
			} else if (x.popularity < y.popularity) {
				return 1
			} else return 0
		})
		this.setState({
			contactList: tempContactList,
		})
	}

	delete = (index) => {
		let tempContactList = [...this.state.contactList]
		tempContactList.splice(index, 1)
		this.setState({
			contactList: tempContactList,
		})
	}

	// Lets style here

	render() {
		const listItems = this.state.contactList.map((contact, index) => {
			return (
				<tr key={index}>
					<td>
						<img src={contact.pictureUrl} />
					</td>
					<td>{contact.name}</td>
					<td>{contact.popularity}</td>
					<td>
						<button onClick={() => this.delete(index)} className='btn'>
							Delete
						</button>
					</td>
				</tr>
			)
		})
		return (
			<div className='divStyle'>
				<h1 className='header'>IronContacts</h1>
				<button onClick={this.randomContact} className='btn'>
					Add Random Contact
				</button>
				<button onClick={this.sortName} className='btn'>
					Sort By Name
				</button>
				<button onClick={this.sortPopularity} className='btn'>
					Sort By Popularity
				</button>
				<table>
					<tbody>
						<tr>
							<th>Picture</th>
							<th>Name</th>
							<th>Popularity</th>
							<th>Action</th>
						</tr>
						{listItems}
					</tbody>
				</table>
			</div>
		)
	}
}

export default App
