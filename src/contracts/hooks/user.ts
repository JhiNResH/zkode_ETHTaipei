import { ethers } from "ethers"
import { UserState } from '@unirep/core'
import { deployUnirep } from '@unirep/contracts/deploy'
import UNIREP_ABI from '@unirep/contracts/abi/Unirep.json'
import { defaultProver } from '@unirep/circuits/provers/defaultProver'
import { Identity } from '@semaphore-protocol/identity'
import { genEpochKey } from '@unirep/utils'

// console.log(abi);
// connect to a wallet
const privateKey = '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80'
const provider = ethers.getDefaultProvider('http://localhost:8545')
const deployer = new ethers.Wallet(privateKey, provider)
const attester = new ethers.Wallet(privateKey, provider)
const abi = JSON.stringify(UNIREP_ABI)
// console.log(abi);

const deploy = async () => {
	// deploy unirep contract
	const unirepContract = await deployUnirep(deployer)
	console.log(unirepContract);
}


const unirepContract = new ethers.Contract('0xCa61bFcA0107c5952f8bf59f4D510d111cbcE146', abi, attester)

const attesterSignUp = async () => {
	// define epoch length
	const epochLength = 5 // 300 seconds
	// send transaction
	const tx = await unirepContract.attesterSignUp(epochLength)
	await tx.wait()
	console.log(tx);
}

const userSignUp = async () => {
	// semaphore Identity
	const identity = new Identity('Something Send In To Identity')
	// const unirepContract = new ethers.Contract('0xca61bfca0107c5952f8bf59f4d510d111cbce146', abi, provider)
	// generate user state
	const userState = new UserState({
		prover: defaultProver, // a circuit prover
		unirepAddress: unirepContract.address,
		provider, // an ethers.js provider
	}, identity)

	// start and sync
	await userState.start()
	await userState.waitForSync()

	// generate signup proof (where should we store here?)
	const { proof, publicSignals } = await userState.genUserSignUpProof()
	console.log(`proof: ${proof}`);
	console.log(`publicSignals: ${publicSignals}`);

	// attester wallet
	const attester = new ethers.Wallet(privateKey, provider)
	// attester sends the tx	
	const tx = await unirepContract.connect(attester).userSignUp(publicSignals, proof)
	await tx.wait()

	await userState.waitForSync()
	console.log(await userState.hasSignedUp()) // true
}

const attest = async () => {

	const identity = new Identity('Something Send In To Identity')
	const attester = new ethers.Wallet(privateKey, provider)
	// get epoch from contract
	const epoch = await unirepContract.attesterCurrentEpoch(attester.address)
	// define nonce
	const nonce = 0 // it could be 0 to (NUM_EPOCH_KEY_NONCE - 1) per user
	// generate an epoch key
	const epochKey = genEpochKey(
		identity.secret,
		BigInt(attester.address),
		epoch,
		nonce
	)

	// attester sends the tx
	const fieldIndex = 0 // the data field that the attester chooses to change
	const change = 5 // the amount of the change
	// know more about data
	// <https://developer.unirep.io/docs/protocol/data>
	const tx = await unirepContract.connect(attester).attest(epochKey, epoch, fieldIndex, change)
	await tx.wait()
	console.log(tx);
}

const userStateTransition = async () => {
	const identity = new Identity('Something Send In To Identity')

	// generate user state
	const userState = new UserState({
		prover: defaultProver, // a circuit prover
		unirepAddress: unirepContract.address,
		provider, // an ethers.js provider
	}, identity)
	// calling this to make sure the state is updated
	await userState.waitForSync()
	// generate the user state transition proof
	const { proof, publicSignals } = await userState.genUserStateTransitionProof()
	// sends the tx
	// it doesn't need to be the attester
	const tx = await unirepContract.userStateTransition(publicSignals, proof)
	await tx.wait()
	console.log(tx);

}

const proveData = async () => {
	const identity = new Identity('Something Send In To Identity')

	// generate user state
	const userState = new UserState({
		prover: defaultProver, // a circuit prover
		unirepAddress: unirepContract.address,
		provider, // an ethers.js provider
	}, identity)

	// calling this to make sure the state is updated
	await userState.waitForSync()
	// the data user wants to prove
	// If the user has 5, then he can choose to prove it is more than 3
	// see: <https://developer.unirep.io/docs/circuits-api/reputation-proof>
	const proof = await userState.genProveReputationProof({
		minRep: 3
	})
	// check if proof is valid
	console.log(`proof verify!`);
	console.log(await proof.verify()) // true
}

const main = async () => {
	// await deploy()    
	// await attesterSignUp()
	// await userSignUp()
	await attest()
	// await userStateTransition()
	// await proveData()
}

main()
