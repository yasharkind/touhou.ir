import Link from "next/link";

export default function notFound(){
	return (
    <Link prefetch={false} href="/home"><center className="text-[50dvw]">404</center></Link>
  );

}
