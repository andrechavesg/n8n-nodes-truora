import {
  IAuthenticateGeneric,
  ICredentialTestRequest,
  ICredentialType,
  INodeProperties,
} from 'n8n-workflow';

/**
 * Credential for authenticating against the Truora API.
 *
 * Truora uses API keys to authenticate requests. According to
 * the official documentation, you must include the key in the
 * `Truora-API-Key` HTTP header when making requests【215324561460098†L46-L53】.  This
 * credential allows n8n to inject the API key into every request
 * automatically. You can customise the base URL if needed (for
 * example when using a sandbox environment).
 */
export class TruoraApi implements ICredentialType {
  name = 'truoraApi';
  displayName = 'Truora API';
  // Link to the official authentication guide
  documentationUrl = 'https://dev.truora.com/checks/authentication/';
  properties: INodeProperties[] = [
    {
      displayName: 'API Key',
      name: 'apiKey',
      type: 'string',
      default: '',
      required: true,
      description: 'Your Truora API key. Include only the key value without any prefix.',
      typeOptions: {
        password: true,
      },
    },
    {
      displayName: 'Base URL',
      name: 'baseUrl',
      type: 'string',
      default: 'https://api.checks.truora.com/v1',
      description:
        'Base URL for the Truora API. Change this if you use a different Truora service (e.g. validations or signals).',
    },
  ];

  /**
   * Inject the API key as a header on each request. Truora expects
   * the key in the `Truora-API-Key` header【215324561460098†L46-L53】.
   */
  authenticate: IAuthenticateGeneric = {
    type: 'generic',
    properties: {
      headers: {
        'Truora-API-Key': '={{$credentials.apiKey}}',
      },
    },
  };

  /**
   * Test request used by n8n to verify the provided credentials. We
   * perform a simple GET request to the checks endpoint. If the API
   * key is valid the request should return a response (HTTP 200 or
   * 204). Otherwise an error will be thrown.
   */
  test: ICredentialTestRequest = {
    request: {
      baseURL: '={{$credentials.baseUrl}}',
      method: 'GET',
      url: '/checks',
    },
  };
}
