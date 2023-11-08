import * as bcrypt from 'bcrypt';
const args = process.argv.slice(2);
if (args.length === 0){
    console.log("Please insert the password you want to hash")
} else {
    console.log(bcrypt.hashSync(args[0],10));
}
