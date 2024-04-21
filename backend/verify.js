import pkg from "hardhat"

export const verify = async (contractAddress, args) => {
    const { run } = pkg
    console.log("Verifying contract...")
    try {
        await run("verify:verify", {
            address: contractAddress,
            constructorArguments: args,
        })
        return
    } catch (e) {
        if (e.message.toLowerCase().includes("already verified")) {
            console.log("Already Verified!")
            return
        } else {
            console.log(e)
            return
        }
    }
  }