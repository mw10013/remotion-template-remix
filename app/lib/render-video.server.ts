import type { AwsRegion } from '@remotion/lambda';
import { renderMediaOnLambda } from '@remotion/lambda';
import invariant from 'tiny-invariant';

export const renderVideo = async ({
	serveUrl,
	compositionId,
	inputProps,
	outName,
}: {
	serveUrl: string;
	compositionId: string;
	inputProps: unknown;
	outName: string;
}) => {
	const functionName = process.env.REMOTION_AWS_FUNCTION_NAME;
	invariant(functionName, 'REMOTION_AWS_FUNCTION_NAME is not set');

	const region = (process.env.REMOTION_AWS_REGION || 'us-east-1') as AwsRegion;

	const { renderId, bucketName } = await renderMediaOnLambda({
		region,
		functionName,
		serveUrl,
		composition: compositionId,
		inputProps,
		codec: 'h264',
		outName,
	});

	return {
		renderId,
		bucketName,
		functionName,
		region,
	};
};
