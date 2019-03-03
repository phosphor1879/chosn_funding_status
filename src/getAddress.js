export default async function getAddress(addr) {
  const resp = await fetch(`http://explore.placeh.io:8080/ext/getaddress/${addr}`);
  return resp.json();
}
