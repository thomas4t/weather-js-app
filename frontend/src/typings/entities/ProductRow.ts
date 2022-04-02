export type ProductRow = IProductListEdge['node']

export const toProductRow = (rows: IProductListConnection): ProductRow[] => rows.edges.map((row) => row.node)
