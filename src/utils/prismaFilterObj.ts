export class PrismaFilterObj  {
  where: object 
  include: object

  constructor() {
    this.where = {}
    this.include = {}
  }
}

export function addWhereClause(prismaFilterObj : PrismaFilterObj, whereClause:object) {
  prismaFilterObj.where =  {...prismaFilterObj.where, ...whereClause}
  return prismaFilterObj
}


export function AddIncludeClause(prismaFilterObj : PrismaFilterObj, includeClause:object) {
  prismaFilterObj.include =  {...prismaFilterObj.include, ...includeClause}
  return prismaFilterObj
}