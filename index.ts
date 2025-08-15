import type { INodeType, ICredentialType } from 'n8n-workflow';
import { Truora } from './nodes/Truora/Truora.node';
import { TruoraApi } from './credentials/TruoraApi.credentials';

/**
 * Entrypoint for the n8n community package. n8n discovers
 * credentials and nodes by reading these exports after the package
 * has been built. See the package.json `n8n` section for the list of
 * compiled files used at runtime.
 */
export const nodes: INodeType[] = [new Truora()];
export const credentials: ICredentialType[] = [new TruoraApi()];
