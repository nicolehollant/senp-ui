import { z } from "zod";

const BASEURL =
  "https://crudify.app/api/user/iTduz8WS9Cug4-cH/crudifyChatMessage";

const validator = z.object({
  media: z.array(z.string()),
  content: z.string(),
  chatID: z.string(),
  userID: z.string(),
  createdAt: z.string(),
});

type GetAllResponse = (typeof validator._input & { id: string })[];
type PostRequest = typeof validator._input;
type PostResponse = typeof validator._input & { id: string };
type GetOneResponse = typeof validator._input & { id: string };
type MatchRequest = { [k: string]: any };
type MatchResponse = (typeof validator._input & { id: string })[];
type PutRequest = typeof validator._input;
type PutResponse = typeof validator._input & { id: string };
type DeleteResponse = typeof validator._input & { id: string };

export type ChatMessageApi = {
  GetAllResponse: GetAllResponse;
  PostRequest: PostRequest;
  PostResponse: PostResponse;
  GetOneResponse: GetOneResponse;
  MatchRequest: MatchRequest;
  MatchResponse: MatchResponse;
  PutRequest: PutRequest;
  PutResponse: PutResponse;
  DeleteResponse: DeleteResponse;
};

export const chatMessageApi = {
  /**
   * Create an entity
   */
  async create(data: PostRequest) {
    const response = await request.post<PostRequest, PostResponse>(
      BASEURL,
      data
    );
    return response;
  },
  /**
   * Get all entities
   */
  async getAll() {
    const response = await request.get<GetAllResponse>(BASEURL);
    return response;
  },
  /**
   * Find an entity
   */
  async match(data: MatchRequest) {
    const response = await request.post<MatchRequest, MatchResponse>(
      BASEURL + "/where",
      data
    );
    return response;
  },
  /**
   * Get one entity
   */
  async getOneByID(entityID: string) {
    const response = await request.get<GetOneResponse>(
      BASEURL + "/" + entityID
    );
    return response;
  },
  /**
   * Delete one entity
   */
  async deleteOneByID(entityID: string) {
    const response = await request.delete<DeleteResponse>(
      BASEURL + "/" + entityID
    );
    return response;
  },
  /**
   * Create an entity
   */
  async updateOne(entityID: string, data: PostRequest) {
    const response = await request.put<PutRequest, PutResponse>(
      BASEURL + "/" + entityID,
      data
    );
    return response;
  },
};

export const chatMessageQueryKeys = {
  create: ["chatMessage", "create"],
  getAll: ["chatMessage", "getAll"],
  match: ["chatMessage", "match"],
  getOneByID: ["chatMessage", "getOneByID"],
  deleteOneByID: ["chatMessage", "deleteOneByID"],
  updateOne: ["chatMessage", "updateOne"],
};
