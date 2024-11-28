import { Header } from "@/sections/common";
import {auth} from "@/auth"

export default async function HeaderWrapper(){
  const session=await auth()
  return <Header session={session} />
}