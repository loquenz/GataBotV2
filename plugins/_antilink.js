let handler = m => m

let linkRegex = /chat.whatsapp.com\/([0-9A-Za-z]{20,24})/i
handler.before = async function (m, { user, isBotAdmin, isAdmin }) {
  if ((m.isBaileys && m.fromMe) || m.fromMe || !m.isGroup) return true
  let chat = global.DATABASE.data.chats[m.chat]
  let isGroupLink = linkRegex.exec(m.text)

  if (chat.antiLink && isGroupLink) {
    if (isAdmin) return m.reply('*Que basado/a eres Admin, no puedo eliminarte 😐*') 
    if (!isBotAdmin) return m.reply('*El Bot no es admin, no puede eliminar 😅*')
    let linkGC = ('https://chat.whatsapp.com/' + await this.groupInviteCode(m.chat))
    let isLinkThisGc = new RegExp(linkGC, 'i')
    let isgclink = isLinkThisGc.test(m.text)
    if (isgclink) return m.reply('*REbasado/a enviaste el enlace de este grupo 🧐*')
    await this.groupRemove(m.chat, [m.sender])
  }
  return true
}

module.exports = handler
