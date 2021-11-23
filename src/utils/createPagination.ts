import { Response } from "../_types/Response";

export async function createPagination(
  model: any,
  args: any,
  name: string,
  params: any
) {
  let queryResults = null;

  if (args.after) {
    // check if there is a cursor as the argument
    queryResults = await model.findMany({
      ...params,
      take: args.first, // the number of items to return from the database
      skip: 1, // skip the cursor
      cursor: {
        id: args.after, // the cursor
      },
    });
  } else {
    // if no cursor, this means that this is the first request
    //  and we will return the first items in the database
    queryResults = await model.findMany({
      ...params,
      take: args.first,
    });
  }

  // if the initial request returns projects
  if (queryResults.length > 0) {
    // get last element in previous result set
    const lastItemInResults = queryResults[queryResults.length - 1];
    // cursor we'll return in subsequent requests
    const myCursor = lastItemInResults.id;

    // query after the cursor to check if we have nextPage
    const secondQueryResults = await model.findMany({
      ...params,
      take: args.first,
      cursor: {
        id: myCursor,
      },
    });

    // return response
    return {
      code: Response.SUCCESS,
      message: `${name} found successfully !`,
      pageInfo: {
        endCursor: myCursor,
        hasNextPage: secondQueryResults.length >= args.first, //if the number of items requested is greater than the response of the second query, we have another page
      },
      edges: queryResults.map((project: any) => ({
        cursor: project.id,
        node: project,
      })),
    };
  }

  return {
    code: Response.FAILURE,
    message: `No ${name} found`,
    pageInfo: {
      endCursor: null,
      hasNextPage: false,
    },
    edges: [],
  };
}
