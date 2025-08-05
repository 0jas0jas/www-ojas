import { title } from "@/components/primitives";
import { Divider } from "@nextui-org/divider";

export default function AlgebraPage() {
  return (
    <div>
      <h1 className={title()}>An article about isomorphism and cool things</h1>
      <Divider className="my-4"/>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor
        augue eget nunc vehicula, sit amet fermentum libero dictum. Nulla
        facilisi. Nullam non ligula ac elit ultricies fermentum. Sed sit amet
        turpis eget nunc vehicula, sit amet fermentum libero dictum. Nulla
        facilisi. Nullam non ligula ac elit ultricies fermentum. Sed sit amet
        turpis
      </p>
    </div>
  );
}
