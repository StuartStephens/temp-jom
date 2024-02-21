"use client";
import Link from "next/link";
import { useEffect, useLayoutEffect, useState } from "react";
import { Accordion, Container } from "react-bootstrap";

export interface IComponentTreeProps {}

export async function generateStaticParams() {
  const posts = await fetch("http://localhost:4000/component").then((res) =>
    res.json()
  );

  return posts;
}

export interface IComponentType {
  id: string;
  Name: string;
  Params: any[];
}

export function ComponentTree(props: IComponentTreeProps) {
  const [components, setComponents] = useState<IComponentType[] | undefined>();
  useLayoutEffect(() => {
    async function getMenu() {
      const params = await generateStaticParams();
      setComponents(params);
    }
    getMenu();
  }, []);
  return (
    <Accordion alwaysOpen>
      {components &&
        components.map((cp: IComponentType, index: number) => {
          return (
            <Accordion.Item eventKey={cp.Name} key={cp.id}>
              <Accordion.Header>{cp.Name}</Accordion.Header>
              <Accordion.Body>
                <Container className="d-flex flex-column">
                  <Link href={`/demo/explorer/${cp.id}/docs`}>Docs</Link>
                  <Link href={`/demo/explorer/${cp.id}/example`}>
                    Example 1
                  </Link>
                  <Link href={`/demo/explorer/${cp.id}/example`}>
                    Example 2
                  </Link>
                  <Link href={`/demo/explorer/${cp.id}/variant`}>Variant</Link>
                </Container>
              </Accordion.Body>
            </Accordion.Item>
          );
        })}
      {/* <Accordion.Item eventKey="0">
        <Accordion.Header>Component 1</Accordion.Header>
        <Accordion.Body>
          <Container className="d-flex flex-column">
            <Link href="/demo/explorer/component_1/docs">Docs</Link>
            <Link href="/demo/explorer/component_1/example">Example 1</Link>
            <Link href="/demo/explorer/component_1/example">Example 2</Link>
            <Link href="/demo/explorer/component_1/variant-1">Variant 1</Link>
            <Link href="/demo/explorer/component_1/variant-2">Variant 2</Link>
          </Container>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="0">
        <Accordion.Header>Component 2</Accordion.Header>
        <Accordion.Body>
          <Container className="d-flex flex-column">
            <Link href="/demo/explorer/component_2/docs">Docs</Link>
            <Link href="/demo/explorer/component_2/example">Example 1</Link>
            <Link href="/demo/explorer/component_2/example">Example 2</Link>
            <Link href="/demo/explorer/component_2/variant-1">Variant 1</Link>
            <Link href="/demo/explorer/component_2/variant-2">Variant 2</Link>
          </Container>
        </Accordion.Body>
      </Accordion.Item> */}
    </Accordion>
  );
}
