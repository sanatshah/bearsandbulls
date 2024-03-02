/// <reference types="node" resolution-mode="require"/>
/// <reference types="node" resolution-mode="require"/>
import { ReadableStream } from 'stream/web';
import IRequestBody from '../types/IRequestBody.js';
import IResponseBody from '../types/IResponseBody.js';
import { Buffer } from 'buffer';
/**
 * Fetch body utility.
 */
export default class FetchBodyUtility {
    /**
     * Wraps a given value in a browser ReadableStream.
     *
     * This method creates a ReadableStream and immediately enqueues and closes it
     * with the provided value, useful for stream API compatibility.
     *
     * @param value The value to be wrapped in a ReadableStream.
     * @returns ReadableStream
     */
    static toReadableStream(value: any): ReadableStream;
    /**
     * Parses body and returns stream and type.
     *
     * Based on:
     * https://github.com/node-fetch/node-fetch/blob/main/src/body.js (MIT)
     *
     * @param body Body.
     * @returns Stream and type.
     */
    static getBodyStream(body: IRequestBody | IResponseBody): {
        contentType: string;
        contentLength: number | null;
        stream: ReadableStream | null;
        buffer: Buffer | null;
    };
    /**
     * Clones a request or body body stream.
     *
     * It is actually not cloning the stream.
     * It creates a pass through stream and pipes the original stream to it.
     *
     * @param requestOrResponse Request or Response.
     * @param requestOrResponse.body
     * @param requestOrResponse.bodyUsed
     * @returns New stream.
     */
    static cloneBodyStream(requestOrResponse: {
        body: ReadableStream;
        bodyUsed: boolean;
    }): ReadableStream;
    /**
     * Consume and convert an entire Body to a Buffer.
     *
     * Based on:
     * https://github.com/node-fetch/node-fetch/blob/main/src/body.js (MIT)
     *
     * @see https://fetch.spec.whatwg.org/#concept-body-consume-body
     * @param body Body stream.
     * @returns Promise.
     */
    static consumeBodyStream(body: ReadableStream | null): Promise<Buffer>;
}
//# sourceMappingURL=FetchBodyUtility.d.ts.map