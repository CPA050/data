export async function onRequestGet() {
  return Response.json({
    ok: true,
    msg: "Functions 已成功运行"
  });
}
