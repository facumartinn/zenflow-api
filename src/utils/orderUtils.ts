/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const orderDetailMapper = (orderDetail: any, orderHeaders?: any) => {
  const groupedProducts = orderDetail.reduce((acc: any, detail: any) => {
    // Crea una clave dinámica basada en el order_id del producto
    const clave = detail.order_id

    if (!acc[clave]) {
      acc[clave] = [detail]
    } else {
      acc[clave].push(detail)
    }

    return acc
  }, {})

  return orderHeaders.map((order: any) => {
    return {
      ...order,
      order_detail: groupedProducts[order.id] || [] // Asegura que order_detail sea un array vacío si no hay productos correspondientes
    }
  })
}
