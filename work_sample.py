import numpy as np
import pandas as pd
import warnings
import time
from parallel_pandas import ParallelPandas

warnings.filterwarnings("ignore")
tf.get_logger().setLevel('ERROR')

ParallelPandas.initialize(n_cpu=4, disable_pr_bar=True)

K.clear_session()
tf.compat.v1.reset_default_graph()
tf.keras.utils.set_random_seed(0)
tf.config.experimental.enable_op_determinism()
#tf.reset_default_graph()

def model_1(ser):
	import numpy as np
	import pandas as pd
	import os, sys
	import tensorflow as tf
	from tensorflow import keras
	from tensorflow.keras import backend as K
	from tensorflow.keras.layers import Dense, LSTM, Bidirectional, Embedding, IntegerLookup
	from tensorflow.keras.optimizers import Adam
	from tensorflow.keras.callbacks import EarlyStopping
	from tensorflow.keras.losses import Loss
	import datetime


	#enable_eager_execution()

	y_pred_org_1 = 0
	try:
		#keys = Your feature column names here as a list of strings
		price_pd_org = pd.read_csv('features_ETH-USD.csv', index_col=False, names=keys, header=None, dtype=object, error_bad_lines=False, warn_bad_lines=False).head(500)
		price_pd_org = price_pd_org.apply(pd.to_numeric, errors = 'coerce')
		price_pd_org['prediction'] = np.nan
		price_pd = price_pd_org.loc[ser.index]
		current_time = float(price_pd.Time.iloc[-1])
		current_price = float(price_pd.Price.iloc[-1])

		price_pd = price_pd.fillna(0).pct_change().fillna(0)
		price_pd['final_y'] = price_pd.Price.shift(-1).fillna(0)
		price_pd = price_pd.replace([np.inf, -np.inf], np.nan).fillna(0)
		dataset = price_pd
		dataset = dataset.drop(columns=['prediction'])

		final_y_numpy_final = price_pd.final_y.to_numpy().flatten()
		columns_1 = dataset.columnsinterval_min = np.amin(final_y_numpy_final)
		interval_min = np.amin(final_y_numpy_final)
		interval_max = np.amax(final_y_numpy_final)
		sample_mat = dataset.iloc[:,:-1].to_numpy()
		datasetx = (sample_mat - np.min(sample_mat)) / (np.max(sample_mat) - np.min(sample_mat)) * (interval_max - interval_min) + interval_min
		dataset = pd.DataFrame(data=datasetx, columns=columns_1[:-1])
		dataset = dataset.assign(final_y=final_y_numpy_final)
		dataset = dataset.reset_index(drop=True)
		Y_train = dataset.iloc[:-1,-1:]
		X_train = dataset.iloc[:-1,:-1]

		columns_1 = dataset.columnsto_Predict = dataset.iloc[-1:,:-1]
		column_length = len(X_train.columns)
		l = len(X_train)
		lr = l

		to_Predict = np.add(np.clip(np.multiply(to_Predict.to_numpy().flatten(), 10000000).astype(int), -100000, 100000), 100000)

		state = np.add(np.clip(np.multiply(X_train.to_numpy().flatten(), 10000000).astype(int), -100000, 100000), 100000)
		reward = np.add(np.clip(np.multiply(Y_train.to_numpy().flatten(), 10000000).astype(int), -100000, 100000), 100000)
		vocab = np.arange(0, 200001, 1).astype(int)
		vocab = np.delete(vocab, np.where(vocab == [-1]), axis=0)
		vocab = tf.convert_to_tensor(vocab)
		state = tf.convert_to_tensor(state)
		reward = tf.convert_to_tensor(reward)
		vocab_layer = IntegerLookup(vocabulary=vocab)
		state = vocab_layer(state)
		reward = vocab_layer(reward)
		to_Predict = vocab_layer(to_Predict).numpy().astype(int).reshape((1, column_length))
		i_vocab_layer = IntegerLookup(vocabulary=vocab, invert=True)
		vocab = vocab_layer(vocab).numpy().flatten()
		state = state.numpy().astype(int).reshape((lr, column_length))
		reward = reward.numpy().astype(int).reshape((lr, 1))

		class MyModel(tf.keras.Model):
			def __init__(self, vocab):
				super().__init__(self)
				self.vocab = vocab
				self.embedding = Embedding(input_dim=self.vocab.size+1, output_dim=1, trainable=True)
				self.lstm2 = Bidirectional(LSTM(1, activation='linear', recurrent_activation='softmax', go_backwards=False, return_sequences=False, stateful=False, use_bias=True, trainable=True), backward_layer=LSTM(1, activation='linear', recurrent_activation='softmax', go_backwards=True, return_sequences=False, stateful=False, use_bias=True, trainable=True))
				self.softmax = Dense(self.vocab.size, activation='softmax', use_bias=True, trainable=True)
				self.none = Dense(1, activation='linear', use_bias=True, trainable=True)

			def call(self, inputs, training=True):
				x = self.embedding(inputs, training=training)
				x = self.lstm2(x, training=training)
				x = self.softmax(x, training=training)
				indices = tf.math.argmax(x, 1)
				x = tf.gather(self.vocab, indices)
				x = tf.dtypes.cast(x, tf.float32)
				x = tf.expand_dims(x, axis=-1)
				x = self.none(x, training=training)
				return x
		
		model = MyModel(vocab)

		class Loss_1(Loss):
			def __init__(self):
				super(Loss_1, self).__init__()
			@tf.function
			def __call__(self, y_true, y_pred, sample_weight=None):
				try:
					y_true = tf.dtypes.cast(y_true, tf.float32)
					y_pred = tf.dtypes.cast(y_pred, tf.float32)
					return tf.math.reduce_mean(tf.math.squared_difference(y_pred, y_true))
				except Exception as e:
					exc_type, exc_obj, exc_tb = sys.exc_info()
					fname = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
					print(exc_type, fname, exc_tb.tb_lineno)
					print(e)

		model.compile(optimizer=Adam(learning_rate=1/lr), loss=Loss_1())

		earlyStopping = EarlyStopping(monitor='loss', mode='min', patience=3, restore_best_weights=True, verbose=0)
		history = model.fit(x=state, y=reward, batch_size=lr, shuffle=False, epochs=100, verbose=0, callbacks=[earlyStopping])
		to_Predict[np.isnan(to_Predict)] = 0
		to_predict_shape = tuple(list(to_Predict.shape))
		y_pred_org_1 = np.squeeze(model.predict(to_Predict.reshape(to_predict_shape).astype(float))).flatten()[0]
		y_pred_org_0 = i_vocab_layer(int(y_pred_org_1)).numpy()
		final_prediction = np.divide(np.subtract(y_pred_org_0, 100000), 10000000)
		
		del model
		K.clear_session()
		tf.compat.v1.reset_default_graph()
		tf.keras.utils.set_random_seed(0)
		tf.config.experimental.enable_op_determinism()

		print('Data_Predict')
		print(datetime.datetime.fromtimestamp(current_time*1000000000))
		print(current_price)
		print(final_prediction)


	except Exception as e:
		exc_type, exc_obj, exc_tb = sys.exc_info()
		fname = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
		print(exc_type, fname, exc_tb.tb_lineno)
		print(e)

	return y_pred_org_1
	

if __name__ == '__main__':
	start = time.time()
	#keys = Your feature column names here as a list of strings
	price_pd_org = pd.read_csv('features_ETH-USD.csv', index_col=False, names=keys, header=None, dtype=object, error_bad_lines=False, warn_bad_lines=False).head(500)
	price_pd_org = price_pd_org.apply(pd.to_numeric, errors = 'coerce')
	price_pd_org['prediction'] = np.nan
	price_pd_org.fillna(0).Time.rolling(25).p_apply(model_1, raw=False, executor='processes')
	end = time.time()
	print((end-start)/60)